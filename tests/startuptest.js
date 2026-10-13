import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 30,
  duration: '5s',
};

export default function () {
  const home = http.get('http://localhost:5050/');
  const visit = http.get('http://localhost:5050/visit');
  const health = http.get('http://localhost:5050/health');
  check(home, { 'status is 200': (r) => r.status === 200 });
  check(visit, { 'status is 200': (r) => r.status === 200 });
  check(health, { 'status is 200': (r) => r.status === 200 });
  sleep(0.2);
}
