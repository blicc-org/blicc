scp -r ./scripts/init.sh root@$IP:/root/init.sh
ssh -t root@$IP "sh init.sh"
