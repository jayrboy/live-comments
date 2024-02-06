#### HTTPS Protocol

- ตัวอย่างการกำหนด URLs ใหม่ เพิ่มค่า แก้ไข ลบ

```js
const myURL = new URL(`https:example.org:8000/path/?abc=123#target`)
console.dir(myURL, { depth: null, color: true }) // URL {}

myURL.port = 8001 // edit
console.log(myURL.href) // https://example.org:8001/path/?abc=123#target

console.log(myURL)
```

```c
URL {
  href: 'https://example.org:1150/path/?abc=123#target',
  origin: 'https://example.org:1150',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.org:1150',
  hostname: 'example.org',
  port: '1150',
  pathname: '/path/',
  search: '?abc=123',
  searchParams: URLSearchParams { 'abc' => '123' },
  hash: '#target'
}
```
