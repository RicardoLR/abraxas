node{
    stage('HelloWorld') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('TestingRun'){
      if(env.BRANCH_NAME == 'testing'){
        sh 'docker build --no-cache -t richi/abraxas .'
        sh 'docker run -e APP=Abraxas -e PORT=8081 -e BACKEND_SERVER=http://localhost:8081 -e NODE_ENV=production -it -p 8082:8081 -d richi/abraxas'
      }
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build --no-cache -t richi/abraxas .'
        sh 'docker run -e APP=Abraxas -e PORT=8081 -e BACKEND_SERVER=http://localhost:8081 -e NODE_ENV=production -it -p 8081:8081 -d richi/abraxas'
      }
    }
}
