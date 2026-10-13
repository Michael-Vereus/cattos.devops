# k6 Test Types: Quick Notes

## Analogy: A Bridge

| Test | Bridge analogy | Question it answers |
|------|----------------|---------------------|
| **Load** | Normal rush-hour traffic | Does it work fine under *expected* usage? |
| **Stress** | Keep adding cars until the bridge cracks | Where is the *breaking point*? |
| **Spike** | A stadium empties and everyone drives on at once | Can it survive a *sudden surge*? |
| **Soak** | Normal traffic, but for days on end | Does it *wear out* over time (leaks, slowdowns)? |

**Easy way to remember:**
- Load = *how much* (expected) -> To know if it works under load or not
- Stress = *how far* (until it breaks) -> To know the breaking point 
- Spike = *how fast* (sudden jump) -> To know if it can hold up when it hit by 1 million request
- Soak = *how long* (extended time) -> To know if there's small leak / bug in the code thats causing problems

---

## 1. Load Test

Simulate expected, normal traffic. Check response times and error rates.

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // ramp up to 50 users
    { duration: '3m', target: 50 },  // hold at 50
    { duration: '1m', target: 0 },   // ramp down
  ],
};

export default function () {
  const res = http.get('http://localhost:8000');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

## 2. Stress Test

Keep increasing load beyond normal until something fails.

```js
export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '2m', target: 400 },
    { duration: '2m', target: 800 },  // keep pushing until it breaks
    { duration: '2m', target: 0 },
  ],
};
```

## 3. Spike Test

Sudden, massive jump in users, then drop back.

```js
export const options = {
  stages: [
    { duration: '30s', target: 20 },    // normal
    { duration: '10s', target: 1000 },  // sudden spike
    { duration: '1m',  target: 1000 },  // hold the spike
    { duration: '10s', target: 20 },    // back to normal
    { duration: '1m',  target: 0 },
  ],
};
```

## 4. Soak Test

Moderate load for a long time. Watch for memory leaks, connection exhaustion, and slow degradation.

```js
export const options = {
  stages: [
    { duration: '5m', target: 50 },   // ramp up
    { duration: '4h', target: 50 },   // hold for hours
    { duration: '5m', target: 0 },    // ramp down
  ],
};
```

---

## Run It

```bash
k6 run loadtest.js
```

**Tip:** Only the `stages` in `options` change between the 4 test types. The `default function` stays the same.
