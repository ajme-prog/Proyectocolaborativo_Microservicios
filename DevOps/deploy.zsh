#!/bin/env zsh 
source ./DevOps/env.zsh
cd DevOps/deployments
function update(){
 VER=$(cat ~/.version)
 image="${1##*:}"
 JK="$image.yaml"
 sed -i 's/\(docker.io\/ren776\/'"$image"'\):[0-9]\+\.[0-9]\+/\1:'"$VER/g" $JK 
 echo Version $VER of the $image service is now ready for deployment .
 kubectl apply -f "$JK"
}

for service in "${SERVICES[@]}"
	update "$service"
