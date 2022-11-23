import http from 'k6/http';
import { Trend } from 'k6/metrics';

const myTrend = new Trend('waiting_time');

export default function () {
  const r = http.get('http://lab.k8s.io/');
  myTrend.add(r.timings.waiting);
  console.log(myTrend.name); // waiting_time
}