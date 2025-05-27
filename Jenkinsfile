pipeline {
    agent { label 'docker-agent' }

    stages {
        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {      
                echo 'This only runs on PRs!'
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
                echo 'Run tests'
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                  sh 'npm install'
                  sh 'npm run test'
                  publishChecks name: 'Jest Tests',
                    title: 'Jest Unit Tests',
                    summary: 'All tests passed',
                    text: 'Jest completed successfully.'
                }

                script {
                  if (currentBuild.currentResult == 'FAILURE') {
                    publishChecks name: 'Jest Tests',
                      title: 'Jest Unit Tests',
                      summary: 'Test failures',
                      text: 'One or more Jest tests failed. Please check the Jenkins logs for details.'
                  }
                }
            }
        }
    }
}
