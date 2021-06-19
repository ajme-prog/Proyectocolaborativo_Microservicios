pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'zsh ~/build.zsh'
      }
    }

    stage('Test') {
      steps {
        sh 'zsh ~/test.zsh'
      }
    }

    stage('Deploy') {
      steps {
        sh 'zsh ~/deploy.zsh'
      }
    }

  }
}
