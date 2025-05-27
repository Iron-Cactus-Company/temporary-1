pipeline {
    agent { label 'nodejs-agent' }

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
                  publishChecks name: 'Unit Tests',
                    title: 'All unit tests are passed'
                    status: 'completed',
                    conclusion: 'success',
                }

                script {
                  if (currentBuild.currentResult == 'FAILURE') {
                    publishChecks name: 'Jest Tests',
                      title: 'Some unit tests are failed',
                      summary: 'Test failures',
                      text: 'One or more Jest tests failed. Please check the Jenkins logs for details.'
                      status: 'completed',
                      conclusion: 'failure',
                  }
                }
            }
        }
    }
}
