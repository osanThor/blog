#!/bin/bash

REPOSITORY=/home/ubuntu/blog
REPOSITORY_PROD=/home/ubuntu/blog

echo "DEPLOYMENT_GROUP_NAME: ${DEPLOYMENT_GROUP_NAME}"

if [ "${DEPLOYMENT_GROUP_NAME}" == "given" ]; then
  echo "운영 서버 배포"
  cd "${REPOSITORY_PROD}"
  
  # production 환경인 경우에 대한 처리
  sudo npm install
  pm2 describe given > /dev/null
  if [ $? -eq 0 ]; then
	  # 실행 중인 경우
	  echo "given 프로세스가 실행 중입니다."
	  sudo npm run pm2:reload:prod
  else
  	# 실행 중이 아닌 경우
  	echo "given 프로세스가 실행되지 않았습니다."
	  sudo npm run pm2:start:prod
  fi
elif [ "${DEPLOYMENT_GROUP_NAME}" == "given_dev" ]; then
  echo "개발 서버 배포"
  cd "${REPOSITORY}"
  sudo npm install
  pm2 describe given-log > /dev/null
  if [ $? -eq 0 ]; then
	  # 실행 중인 경우
	  echo "given-log 프로세스가 실행 중입니다."
	  sudo npm run pm2:reload:dev
  else
  	# 실행 중이 아닌 경우
  	echo "given-log 프로세스가 실행되지 않았습니다."
	  sudo npm run pm2:start:dev
  fi
fi