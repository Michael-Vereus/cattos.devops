FROM python:3.12-slim
# from that image python i pull the image why not alpine ? Alpine uses musl while slim is debian based which meant it uses glibc hence why i choose python
# second most python packages targets glibc not musl so on alpine pip often has to compile things from the source which obv takes time
WORKDIR /app
# basically the same as mkdir app then cd /app but every command that ran underthis workdir is ran inside that /app folder
COPY requirements.txt .
# basically copying all of the requirements.txt file to the docker dir /app
RUN pip install --no-cache-dir -r requirements.txt
# why do i use run instead of cmd ? well run is a one time command that ran during build
# its like when u're making a car, u only put together the parts once not everytime u wanna use it thats what run is for to run commands during build
# while cmd is a command u ran everytime the container starts
COPY app.py .
# basically copes the app.py file into the docker dir /app
# why dont we need the other files ? well the only real code / logic that is the app.py else are js libs, venv, etc.
# So it doesnt have any importance being on the Docker container
EXPOSE 5050
# its basically only to define the docker which want to listen
CMD ["gunicorn", "--bind", "0.0.0.0:5050", "--workers", "4", "--threads", "2" ,"app:app"]
# its a command that ran gunicorn server to serve the micro-app api
