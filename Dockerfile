# Use Python 3 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend and frontend files
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Run Flask app
CMD ["python", "backend/app.py"]
