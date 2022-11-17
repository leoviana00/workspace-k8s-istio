<h1 align="center">Balanceador Haproxy</h1>

<p align="center">
  <img alt="Balanceador" src="../images/lb-haproxy.png">
</p>


## Etapas

- Criação de um docker-compose para subir um balanceador haproxy
- Criar arquivo de configuração haproxy
  - Ativar dashboardo haproxy
  - Adicionar o Cluster Kubernetes no haproxy
  - Adicionar serviço nginx ao haproxy


## Comandos

- Subindo o balanceador

```bash
docker-compose up -d
```

- Derrubando o balanceador

```bash
docker-compose down
```

- Restartando o balanceador

```bash
docker-compose restart
```