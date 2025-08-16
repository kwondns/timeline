#!/bin/bash
cd /home/ec2-user/timeline || exit
rm -f .env
yarn install --omit=dev

echo "[DEBUG] .env 생성 시작" >&2
SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id tms-secret --query SecretString --output text)
{
  echo "API_SERVER_URL=$(echo $SECRET_JSON | jq -r .timeline_api_server_url)"
  echo "SESSION_SECRET=$(echo $SECRET_JSON | jq -r .timeline_session_secret)"
  echo "NEXT_PUBLIC_IMAGE_URL=$(echo $SECRET_JSON | jq -r .timeline_image_url)"
  echo "LOCAL=$(echo $SECRET_JSON | jq -r .timeline_local)"
  echo "NEXT_PUBLIC_CHATBOT_URL=$(echo $SECRET_JSON | jq -r .chatbot_url)"
} > .env
echo "[DEBUG] .env 생성 완료" >&2
