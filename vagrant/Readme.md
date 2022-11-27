<h1 align="center">Vagrand - Virtualbox</h1>

<p align="center">
  <a href="#ambiente">Ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologia">Tecnologia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#vagrantfile">Vagrantfile</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#comandos">Comandos</a>
</p>

<p align="center">
  <img alt="Vagant" src="../images/vagrant.jpg">
</p>

## Ambiente

- Levantando as máquinas virtuais

## Tecnologia

- Vagrant
- Virtuabox

## Vagrantfile

- Criar um vagrantfile com a arquitetura necessário para subir um cluster kubernetes
- vagrany up (Subir as vms)
- vagrant destroy (Derrubar o ambiente)

1. Vagrantfile
- Construção do vagrantfile

```vagrantfile
machines = {
  "master-01" => {"memory" => "2048", "cpu" => "2", "ip" => "11", "image" => "bento/ubuntu-20.04"},
  "node-01"   => {"memory" => "4096", "cpu" => "2", "ip" => "21", "image" => "bento/ubuntu-20.04"},
  "node-02"   => {"memory" => "4096", "cpu" => "2", "ip" => "22", "image" => "bento/ubuntu-20.04"},
  "etcd-01"   => {"memory" => "2048", "cpu" => "2", "ip" => "31", "image" => "bento/ubuntu-20.04"},
  "calico-01" => {"memory" => "2048", "cpu" => "2", "ip" => "41", "image" => "bento/ubuntu-20.04"}
}

Vagrant.configure("2") do |config|

    machines.each do |name, conf|
        config.vm.define "#{name}" do |machine|
            machine.vm.box = "#{conf["image"]}"
            machine.vm.hostname = "#{name}.lab.k8s.io"
            machine.vm.network "private_network", ip: "192.168.50.#{conf["ip"]}"

            machine.vm.provision "shell" do |s|
                ssh_pub_key = File.readlines("../keys/kubespray.pub").first.strip
                s.inline = <<-SHELL
                echo "Ambiente para laboratório: K8S com kubespray" > /tmp/vagrant.txt
                echo #{ssh_pub_key} >> /home/vagrant/.ssh/authorized_keys
                echo #{ssh_pub_key} >> /root/.ssh/authorized_keys
            SHELL
            end

            machine.vm.provider "virtualbox" do |vb|
                vb.name = "#{name}"
                vb.memory = conf["memory"]
                vb.cpus = conf["cpu"]
            end
        end
    end
end
```

- Recursos:
```console
    - 1 master 2 x 2
    - 2 nodes  2 x 4
    - 1 etcd   2 x 2
    - 1 calico 2 x 2
```

## Comandos

- Subir as vms

```bash
vagrant up
```

- Destruir as vms

```bash
vagrant destroy -f
```

- Parar as vms

```bash
vagrant halt
```

- Acesso a vm

```bash
vagrant ssh master-01
```
