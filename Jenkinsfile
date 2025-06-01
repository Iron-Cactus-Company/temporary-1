pipeline {
    agent { label 'nodejs-agent' }

    stages {
        stage('PR checks') {
          when {
            branch 'PR-*'
          }
          steps {
            echo 'Running PR checks...'

            script {
              def checkName = 'Unit Tests'

              def npmStatus = sh(script: 'npm install', returnStatus: true)
              if (npmStatus != 0) {
                publishChecks name: checkName,
                  title: 'Dependency Installation Failed',
                  summary: '`npm install` failed',
                  text: 'Check your `package.json` and ensure all dependencies are valid.',
                  status: 'COMPLETED',
                  conclusion: 'FAILURE'
                error('Stopping pipeline due to npm install failure')
              }

    //                     def testOutput = sh(
    //                       script: 'npm run test -- --ci 2>&1 | npx strip-ansi || true',
    //                       returnStdout: true
    //                     ).trim()

              def testOutput = sh(
                  script: 'npm run test:coverage',
                  returnStdout: true
              ).trim()

              def testFailed = testOutput.contains('FAIL') || testOutput.contains('Test Suites: ') && testOutput.contains('failed')

              if (testFailed) {
                publishChecks name: checkName,
                  title: 'Unit Tests Failed',
                  summary: '❌ Jest tests failed',
                  text: """```
                  ${testOutput.take(6500)}
                  ```""",
                  status: 'COMPLETED',
                  conclusion: 'FAILURE'
                } else {
                publishChecks name: checkName,
                  title: 'Unit Tests Passed',
                  summary: '✅ All Jest tests passed',
                  text: """```
                  ${testOutput.take(6500)}
                  ```""",
                  status: 'COMPLETED',
                  conclusion: 'SUCCESS'
              }
            }
          }
          post {
            always {
              recordCoverage(
                tools: [
                  [parser: 'COBERTURA', pattern: '**/cobertura-coverage.xml'],
                  [parser: 'JUNIT', pattern: 'junit.xml']
                ]
              )

//               junit 'junit.xml'

//               publishHTML target: [
//                 allowMissing         : true,
//                 alwaysLinkToLastBuild: false,
//                 keepAll             : true,
//                 reportDir            : 'coverage',
//                 reportFiles          : 'index.html',
//                 reportName           : 'Unit Test Report'
//               ]
            }
          }
        }
    }
}
