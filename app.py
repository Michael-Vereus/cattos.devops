import os

import redis
from flask import Flask, jsonify

app = Flask(__name__)
r = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=6379,
    decode_responses=True
)

@app.route("/")
def home():
    addGetReqCount()
    return jsonify(message="Hello From flask api")

@app.route("/health")
def health():
    addGetReqCount()
    return jsonify(
        is_runing=True,
        total_get_req=getReqCount(),
        total_visit=getVisitCount()
    )

@app.route("/visit")
def visit():
    addGetReqCount()
    r.incr("visit")
    return jsonify(message="visited micro app api !")

def addGetReqCount():
    r.incr("req_count")
def getReqCount():
    return int(r.get("req_count") or 0)
def getVisitCount():
    return int(r.get("visit") or 0)

if __name__ == "__main__" :
    app.run(host="0.0.0.0", port=5051)
