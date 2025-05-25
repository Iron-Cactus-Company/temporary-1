pipeline {
    agent { label 'docker-agent' }

    stages {
        stage('Say hello!') {
            steps {
                echo "Hello World"
            }
        }

        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {
                sh '''
                cat README.md
                '''
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
