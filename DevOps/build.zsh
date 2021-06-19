#!/bin/env/zsh

source ./DevOps/env.zsh
AVER="$(cat ~/.version)"
AVER="${AVER:-1.0}"
AVER="$(echo $AVER | awk -F'.' "$NEXT_VERSION")"
COMMIT="$(git log -1 --pretty=%B)"
VER="$(echo "$COMMIT" | grep -oP '([0-9]+\.?)+' ||:)" 
if [[ ! "$VER" ]]; then
  VER=$AVER
fi
echo $VER > ~/.version
REN="$PWD"

function gather(){
	image="${1##*:}"
	base="${1%%:*}"
  cp ~/.env "$base"
	cd "$base"
  TAG="$registry/$image:$VER"
  source ~/.docker-hub.sh
  docker build -t "$TAG" .
  docker push "$TAG"
  echo "Service successfully gathered from:  $REN/$base"
  cd "$REN"
}


echo "$DOCKER_HUB_PWD" | docker login --username="$DOCKER_HUB_UNAME" --password-stdin
for service in "${SERVICES[@]}"
	gather "$service"

echo building frontend ...
cd "$REN"
cd Frontend/build
for i in ./**/*.js(.ND)
do
  sed -i 's/localhost:3001/104.198.109.25:3001/g' "$i"
  sed -i 's/localhost:4040/35.247.41.123:4040/g' "$i"
  sed -i 's/localhost:4000/34.82.243.163:4000/g' "$i"
  sed -i 's/localhost:1989/34.83.236.121:1989/g' "$i"
  sed -i 's/localhost:9000/35.233.133.215:9000/g' "$i"
done

docker build -t "$registry/frontend:$VER"
docker push "$registry/frontend:$VER"
