fluent-view
===========

Dependencies
============

- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [fluentd](http://www.fluentd.org/)
- [fluent-plugin-out-http](https://github.com/ento/fluent-plugin-out-http)


GetStarted
===========

### Start server

    $ npm install
    $ node bin/www

Access http://{server-host}:3000

### fluentd

#### install http plugin

    $ gem install fluent-out-http-buffered

#### fluentd.conf

    <store>
        type             http
        endpoint_url     http://{server-host}:3000/receive
        http_method      post
        serializer       json
    </store>
