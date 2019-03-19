node{

    git url: 'https://github.com/jenkinsci/git-tag-message-plugin'
    env.GIT_TAG_NAME = gitTagName()
    env.GIT_TAG_MESSAGE = gitTagMessage()

    RAMA_CUSTOM = 'initial_value'
    RAMA_GIT = 'initial_value'
    HASH_GIT = 'initial_value'

    stage('HelloWorld') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "============================================================"
      echo "Branch: ${env.BRANCH_NAME}"
      echo "GIT_TAG_NAME: ${env.GIT_TAG_NAME}"
      echo "GIT_TAG_MESSAGE: ${env.GIT_TAG_MESSAGE}"
      echo "CHANGE_TITLE: ${env.CHANGE_TITLE}"
      echo "env: ${env}"
      echo "============================================================"
      
      echo sh(returnStdout: true, script: 'env')
      echo "============================================================"
      echo sh(script: 'env|sort', returnStdout: true)

      echo "============================================================"


      script {
            RAMA_CUSTOM = sh (script: "cat ./ambiente/ambiente.txt", returnStdout: true)
      }
      echo "RAMA_CUSTOM: ${RAMA_CUSTOM}"
      if(RAMA_CUSTOM == 'WEB'){
        echo "RAMA_CUSTOM procesando... "
      }else{
        echo "no es RAMA_CUSTOM... "
      }


      script {
            HASH_GIT = sh (script: "git rev-parse HEAD", returnStdout: true)
      }
      echo "HASH_GIT: ${HASH_GIT}"

      script {
            RAMA_GIT = sh (script: "git log --pretty=oneline \${HASH_GIT}", returnStdout: true)
            RAMA_GIT = sh (script: "\${RAMA_GIT} | grep \${HASH_GIT}", returnStdout: true)
            RAMA_GIT = sh (script: "\${RAMA_GIT} | awk '{ print \$2 }'", returnStdout: true)
      }

      // sh "RAMA_GIT=git log --pretty=oneline \${HASH_GIT}"
      // sh "RAMA_GIT=grep \${HASH_GIT}"
      // sh "RAMA_GIT=awk '{ print \$2 }'"
      // sh "RAMA_GIT=\$(git log --pretty=oneline \${HASH_GIT} | grep \${HASH_GIT} | awk '{ print \$2 }')"

      echo "RAMA_GIT: ${RAMA_GIT}"
      if(RAMA_GIT == 'WEB_BUILD'){
        echo "RAMA_GIT procesando WEB_BUILD... "
      }else{
        echo "no es RAMA_GIT WEB_BUILD... "
      }

      

 

      sh 'docker -v'
      sh 'printenv'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build --no-cache -t richi/abraxas .'
        sh 'docker run -e APP=Abraxas -e PORT=8081 -e BACKEND_SERVER=http://localhost:8081 -e NODE_ENV=production -it -p 8081:8081 -d richi/abraxas'
      }
    }
}

 
/** @return The tag name, or `null` if the current commit isn't a tag. */
String gitTagName() {
    commit = getCommit()
    if (commit) {
        desc = sh(script: "git describe --tags ${commit}", returnStdout: true)?.trim()
        if (isTag(desc)) {
            return desc
        }
    }
    return null
}
 
/** @return The tag message, or `null` if the current commit isn't a tag. */
String gitTagMessage() {
    name = gitTagName()
    msg = sh(script: "git tag -n10000 -l ${name}", returnStdout: true)?.trim()
    if (msg) {
        return msg.substring(name.size()+1, msg.size())
    }
    return null
}
 
String getCommit() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
}
 
@NonCPS
boolean isTag(String desc) {
    match = desc =~ /.+-[0-9]+-g[0-9A-Fa-f]{6,}$/
    result = !match
    match = null // prevent serialisation
    return result
}