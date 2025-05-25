pipeline {
    agent { label 'docker-agent' }

    stages {
        stage('Say hello') {
            steps {
                echo "Hello World"
            }
        }

        stage('For bug branches') {
            when {
                barnch "bug/*"
            }
            steps {
                sh '''
                cat README.md
                '''
            }
        }
        stage('For bug branches') {
            when {
                barnch 'PR-*'
            }
            steps {
                echo 'This only runs on PRs'
            }
        }
    }
}
