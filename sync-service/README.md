# sync-service

PARAMETER JSON CHANGES
We need to update following once the initial setup infra is created by Devops: 
1. SubNet IDs
2. Security Group ID
3. VPC ID
4. Lambda role

For now, In beta env we have kept points 1 to 3 (from above) same as dev which were created by devops manually. Lambda role has been kept as basic lambda execution role for beta env which is being used by OFC.

For Envs other than dev & beta, we have kept placeholder for above mentioned keys which will also be replaced after the devops infra creation.


BUILDSPEC CHANGES
We need to update following once the initial setup infra is created by Devops: 
1. bucket for static code report upload & mocha chai.