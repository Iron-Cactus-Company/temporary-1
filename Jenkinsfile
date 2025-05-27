pipeline {
    agent { label 'docker-agent' }

    stages {
        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {      
                echo 'This only runs on PRs'
                publishChecks name: "Bug branches name",
                    title: 'Everything is ok on bug branch',
                    summary: '✅ All tests passed.',
                    text: 'Jest unit tests completed successfully.',
                    status: 'COMPLETED',
                    conclusion: 'SUCCESS',
                    detailsURL: "${env.BUILD_URL}"
            }
        }
        stage('For PRs') {
            when {
                branch 'PR-*'
            }
            steps {
                echo 'This only runs on PRs'
                publishChecks name: "PR checks name",
                    title: 'Everything is ok for PR',
                    summary: 'PR summury',
                    text: 'PR text here.',
                    status: 'COMPLETED',
                    conclusion: 'SUCCESS',
                    detailsURL: "${env.BUILD_URL}"
            }
        }
    }
}
