#nginx 설치
FROM nginx

# 프로젝트 시작 시 들어갈 폴더
RUN mkdir /app

#app 폴더에서 작업
WORKDIR /app

# build 폴더 생성
RUN mkdir ./build

# 현재 경로의 build 폴더를 이전에 생성한 build 폴더에 복사
ADD ./dist ./build

# nginx 기본 설정 환경 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 호스트에서 생성한 nginx 환경 파일을 해당 경로로 복사
ADD ./nginx.conf /etc/nginx/conf.d

#생성한 이미지에서 80번 포트를 노출 하도록 설정
EXPOSE 80

#컨테이너 실행 시 수행할 동작 (nginx 시작)
CMD [ "nginx", "-g","daemon off" ]