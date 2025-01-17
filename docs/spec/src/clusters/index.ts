import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const clusterSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: databricks.com/api/2.0/clusters/list
     * PATTERN: Fetch Entities
     */
    id: 'fetch-clusters',
    name: 'Fetch Clusters',
    entities: [
      {
        resourceName: 'Cluster',
        _type: 'databricks_cluster',
        _class: ['Cluster'],
      },
    ],
    relationships: [
      {
        _type: 'databricks_workspace_has_cluster',
        sourceType: 'databricks_workspace',
        _class: RelationshipClass.HAS,
        targetType: 'databricks_cluster',
      },
    ],
    dependsOn: ['fetch-workspace'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build Child Relationships
     */
    id: 'build-cluster-user-relationships',
    name: 'Build Cluster User Relationships',
    entities: [],
    relationships: [
      {
        _type: 'databricks_user_created_cluster',
        sourceType: 'databricks_user',
        _class: RelationshipClass.CREATED,
        targetType: 'databricks_cluster',
      },
    ],
    dependsOn: ['fetch-group-users', 'fetch-clusters'],
    implemented: true,
  },
];
