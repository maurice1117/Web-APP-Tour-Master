FROM python:3.10
ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip  && \
    pip install --no-cache-dir -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "TourMaster.wsgi:application", "--bind", "0.0.0.0:8000"]
