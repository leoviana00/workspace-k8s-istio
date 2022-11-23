## Métricas integradas específicas do HTTP

| Nome da métrica | Contador | Descrição |
| --- | --- | --- |
| http_reqs | Contador | Quantos pedidos HTTP totais k6 gerou | 
| http_req_blocked | Rate | Tempo gasto bloqueado (aguardando um slot de conexão TCP livre) antes de iniciar a solicitação. Flutuador
| http_req_connecting | Trend | Tempo gasto estabelecendo conexão TCP com host remoto. Flutuador
| http_req_tls_handshaking | Trend | Tempo gasto em sessão TLS de handshaking com host remoto |
| http_req_sending	| Trend	| Tempo gasto no envio de dados para o host remoto.flutuador |
| http_req_waiting	| Trend	| Tempo gasto aguardando resposta do host remoto (também conhecido como “tempo para o primeiro byte” ou “TTFB”).flutuador |
| http_req_receber	| Trend	| Tempo gasto recebendo dados de resposta do host remoto.flutuador |
| http_req_duration	| Trend	| Tempo total para a solicitação. é igual ahttp_req_sending + http_req_waiting + http_req_receiver(ou seja, quanto tempo o servidor remoto levou para processar a solicitação e responder, sem os tempos iniciais de pesquisa/conexão de DNS).flutuador |
| http_req_failed	| Rate	| A taxa de solicitações com falha de acordo com setResponseCallback |


## Acessando temporizações HTTP a partir de um script

- Para acessar as informações de tempo de uma solicitação HTTP individual, o objeto Response.timings fornece o tempo gasto nas várias fases emEM:

    - bloqueado: igual ahttp_req_blocked.
    - conectando: igual ahttp_req_connecting.
    - tls_handshaking: igual ahttp_req_tls_handshaking.
    - envio: igual a http_req_sending.
    - esperando: igual ahttp_req_waiting.
    - recebimento: igual ahttp_req_receber.
    - duração: igual ahttp_req_duration.


## Comandos

```bash
k6 run --vus 200 --duration 30s --insecure-skip-tls-verify script-targets.js
```

```bash
k6 run script.js
```