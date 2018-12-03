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
    stage('Testing'){
      if(env.BRANCH_NAME == 'testing'){
        sh 'docker build --no-cache -t richi/abraxas .'
        sh 'docker run -e APP=Abraxas -e PORT=8082 -e BACKEND_SERVER=http://localhost:8082 -e NODE_ENV=production -it -p 8082:8082 -d richi/abraxas'
      }
    }
}
