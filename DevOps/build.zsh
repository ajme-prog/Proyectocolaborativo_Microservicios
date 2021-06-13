#!/bin/env/zsh
source ./DevOps/env.zsh
AVER="$(cat ~/.version)"
AVER="${AVER:-1.0}"
AVER="$(echo $AVER | awk -F'.' "$NEXT_VERSION")"

function gather(){
	REN="$PWD"
	image="${1##*:}"
	base="${1%%:*}"
  cp ~/.env "$base"
	cd "$base"
  COMMIT="$(git log -1 --pretty=%B)"
  VER="$(echo "$COMMIT" | grep -oP '([0-9]+\.?)+' ||:)" 
  if [[ ! "$VER" ]]; then
    VER=$AVER
  fi
  echo $VER > ~/.version
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
