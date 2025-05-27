pipeline {
    agent { label 'docker-agent' }

    stages {
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

     post {
         success {
            githubCheck name: "This is the name", status: 'completed', conclusion: 'success', summary: 'Success summury is here', detailsURL: env.BUILD_URL
         }
         
        failure {
            githubCheck name: "Somethings is wrong", status: 'completed', conclusion: 'failure', summary: '❌ CI pipeline failed.', detailsURL: env.BUILD_URL
        }
    }
}
