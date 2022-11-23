import http from 'k6/http';

export default function () {
  const res = http.get('http://lab.k8s.io/');
  console.log('Response time was ' + String(res.timings.duration) + ' ms');
}