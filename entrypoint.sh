flask db upgrade
gunicorn -w 4 -b 0.0.0.0:1196 index:index