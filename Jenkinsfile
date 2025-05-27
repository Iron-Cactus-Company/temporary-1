pipeline {
    agent { label 'docker-agent' }

    stages {
        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {              
                echo "Failing here"
                sh 'exit 1'
            }
        }
        stage('For PRs') {
            when {
                branch 'PR-*'
            }
            steps {
                echo 'This only runs on PRs'
            }
        }
    }
}
