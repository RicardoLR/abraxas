node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app localhost:8081/react-app'
        sh 'docker push localhost:8081/react-app'
        sh 'docker rmi -f react-app localhost:8081/react-app'
      }
    }
  }
  catch (err) {
    throw err
  }
}
