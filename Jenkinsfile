pipeline {
    agent { label 'docker-agent' }

    stages {
        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {
                publishChecks name: "Name for bugs here",
                    title: 'CI Pipeline Started',
                    summary: 'Jenkins pipeline has started running.',
                    text: 'Preparing to run tests and other checks.',
                    status: 'IN_PROGRESS',
                    detailsURL: "${env.BUILD_URL}"
                
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
                publishChecks name: "Name for PR here",
                    title: 'CI Pipeline Succeeded',
                    summary: '✅ All tests passed.',
                    text: 'Jest unit tests completed successfully.',
                    status: 'COMPLETED',
                    conclusion: 'SUCCESS',
                    detailsURL: "${env.BUILD_URL}"
                
                echo 'This only runs on PRs'
            }
        }
    }
}
