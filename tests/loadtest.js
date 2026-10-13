import http from 'k6/http'
import { check, sleep } from 'k6'

// export const options = {
//   vus: 500,
//   duration: '10s',
// };
export const options = { // stress testing
  stages: [
    { duration: '30s', target: 500 },
    { duration: '1m',  target: 1000 },
    { duration: '1m',  target: 2000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const resA = http.get('http://localhost:5050/');
  const resB = http.get('http://localhost:5050/visit');
  const resC = http.get('http://localhost:5050/health');
  check(resA, { 'status is 200': (r) => r.status === 200 });
  check(resB, { 'status is 200': (r) => r.status === 200 });
  check(resC, { 'status is 200': (r) => r.status === 200 });
  sleep((Math.floor(Math.random() * 20) + 1) / 100);
}
