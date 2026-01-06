---
title: "Pipelines de Datos: De ETL a Real-Time Stream Processing"
description: "Evolución de arquitecturas ETL hacia soluciones de stream processing. Apache Kafka, Spark Streaming y Azure Event Hubs para procesamiento en tiempo real."
author: "Camilo Salazar Ocampo"
pubDate: 2024-12-15
heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
category: "Data Engineering"
tags: ["ETL", "ELT", "stream processing", "Kafka", "Spark", "real-time"]
readingTime: 13
featured: true
---

## Evolución de Pipelines

```
1990s: ETL Batch
  Oracle → Transform → Warehouse
  
2010s: ELT Moderno  
  Cloud Storage → SQL Transform → Analytics
  
2020s: Real-Time Streaming
  Sources → Kafka/Pubsub → Process → Analytics
```

## ETL vs ELT vs Streaming

### ETL (Clásico - 2000s)
```
Extract → Transform → Load

Características:
- Batch diario/semanal
- Transform OFF-premises
- Latencia: horas/días
- Costos compute: medio
```

### ELT (Moderno - 2015s)
```
Extract → Load → Transform

Características:
- Batch horario
- Transform in-place (SQL)
- Latencia: minutos
- Costos compute: alto en picos
```

### Streaming (2020+)
```
Extract → Process → Load (Continuous)

Características:
- Real-time (milliseconds)
- Event-driven architecture
- Latencia: <1 segundo
- Costos: optimizados
```

## Arquitectura Streaming Moderna

```
        ┌─────────────┐
        │   Sources   │
        │ (APIs, IoT) │
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │  Message Q  │
        │   (Kafka)   │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │  Stream Process │
        │  (Spark/Flink)  │
        └──────┬──────────┘
               │
        ┌──────▼─────────┐
        │  Data Sink     │
        │ (DW/Lake)      │
        └────────────────┘
```

## Ejemplo 1: Kafka + Spark Streaming

### Productor (Python)

```python
from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
  bootstrap_servers=['localhost:9092'],
  value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

while True:
  event = {
    'user_id': 'user_' + str(int(time.time()) % 1000),
    'action': 'page_view',
    'timestamp': int(time.time()),
    'page': '/products'
  }
  producer.send('user_events', event)
  time.sleep(1)
```

### Consumidor (Spark)

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, window, count

spark = SparkSession.builder \
  .appName("StreamingAnalytics") \
  .getOrCreate()

# Leer desde Kafka
df_stream = spark.readStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", "localhost:9092") \
  .option("subscribe", "user_events") \
  .load()

# Parsear JSON
from pyspark.sql.functions import from_json

schema = "user_id STRING, action STRING, timestamp LONG, page STRING"

events = df_stream.select(
  from_json(col("value").cast("string"), schema).alias("data")
).select("data.*")

# Agregación en ventana de 5 minutos
results = events \
  .groupBy(window(col("timestamp"), "5 minute"), col("page")) \
  .agg(count("user_id").alias("pageviews"))

# Escribir a console (en prod → parquet/database)
query = results.writeStream \
  .outputMode("update") \
  .format("console") \
  .start()

query.awaitTermination()
```

## Ejemplo 2: Azure Event Hubs + Stream Analytics

```sql
-- Stream Analytics Query
SELECT
  DeviceId,
  Avg(Temperature) as AvgTemp,
  Max(Humidity) as MaxHumidity,
  System.Timestamp as WindowTime
INTO AlertsOutput
FROM IoTInput TIMESTAMP BY EventTime
GROUP BY 
  DeviceId,
  TumblingWindow(minute, 1)
HAVING 
  Avg(Temperature) > 30 OR Max(Humidity) > 80
```

## Casos de Uso Real-Time

### E-commerce (Recomendaciones)
```
User clicks → Kafka → ML Model → 
Update profile → Real-time recommendations
Latencia: <500ms
```

### Monitoreo de Sistemas
```
Logs/Metrics → Kafka → Alerting Engine →
Slack/PagerDuty
Latencia: <1s
```

### Fraude Detectión
```
Transacciones → Kafka → Rules Engine →
Block/Review
Latencia: <100ms (crítico)
```

## Comparativa Herramientas Streaming

| Herramienta | Latencia | Escalabilidad | Complejidad |
|------------|----------|---------------|------------|
| **Kafka Streams** | <100ms | Excelente | Media |
| **Spark Streaming** | <500ms | Muy buena | Alta |
| **Flink** | <100ms | Excelente | Muy Alta |
| **Kinesis** | <1s | Buena | Baja |
| **Pub/Sub** | <100ms | Excelente | Baja |

## Deployment: Streaming en Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spark-streaming-job
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: spark-job
        image: spark:streaming-v1
        env:
        - name: KAFKA_BROKERS
          value: "kafka-cluster:9092"
        - name: TOPIC
          value: "user_events"
        resources:
          requests:
            memory: "2Gi"
            cpu: "1"
          limits:
            memory: "4Gi"
            cpu: "2"
```

## Costos Comparativos (1TB/día, 24/7)

### ELT Batch (BigQuery)
```
Compute: 30TB × $6.25 = $187.50/mes
Storage: $10/mes
━━━━━━━━━━━━━━━━━━━━━━━
Total: $197.50/mes
```

### Streaming (Kafka + Spark)
```
Kafka: 3 brokers × $0.22/hour = $1,600/mes
Spark Streaming: 10 nodes × $0.30/hour = $2,160/mes
Storage: $50/mes
━━━━━━━━━━━━━━━━━━━━━━━
Total: $3,810/mes
```

**Decisión**: ELT para analytics histórico, Streaming para real-time.

## Monitoreo de Pipelines

```python
from prometheus_client import Counter, Histogram
import time

# Métricas clave
events_processed = Counter('events_processed_total', 'Total events')
processing_time = Histogram('processing_time_seconds', 'Processing latency')

@processing_time.time()
def process_event(event):
  # Tu lógica
  events_processed.inc()
  return result
```

## Checklist de Producción

- ✅ Dead letter queue (retry failed messages)
- ✅ Monitoring + alertas
- ✅ Auto-scaling configurado
- ✅ Backup/recovery plan
- ✅ Data quality checks
- ✅ Documentación de schema
- ✅ Capacitación del equipo

---

**Conclusión**: El futuro es híbrido: ELT para analytics, Streaming para real-time. Domina ambos paradigmas.
