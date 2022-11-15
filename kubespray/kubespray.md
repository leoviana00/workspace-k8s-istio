## Subindo kubernetes utilizando o `kubespray`

0. cd /kubespray
1. sudo pip3 install -r requirements.txt
2. cp -rfp inventory/sample inventory/mycluster
3. declare -a IPS=(192.168.50.30 192.168.50.11 192.168.50.12 192.168.50.20 192.168.50.41)
4. CONFIG_FILE=inventory/lab-k8s/hosts.yaml python3 contrib/inventory_builder/inventory.py ${IPS[@]}
5. ansible-playbook -i inventory/lab-k8s/hosts.yaml  --become -u vagrant --become-user=root cluster.yml

[Kebespray Readme ](/src/kubespray/README.md)