# Caching Strategy

## Why Cache "Get All Tasks"
- Most frequently used endpoint
- Reduces DB load

## How It Works
- Stores response in memory
- Valid for 60 seconds

## Cache Invalidation
- Cleared when:
  - Task created
  - Task updated
  - Task deleted

## Limitations
- Lost on server restart
- Not scalable (single instance only)