<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useJsonDataStoreMaplestory } from '@/stores/dataStoreMaplestory'; // Pinia 스토어 임포트

// Pinia 스토어 사용
const dataStore = useJsonDataStoreMaplestory();

// 데이터와 로딩 상태를 가져옵니다.
const data = ref(dataStore.jsonData);
const isLoading = ref(dataStore.pending);
const errorMessage = ref(dataStore.errorMessage);

// 각각 다른 filepath 설정
const filepath = 'Maplestory.json'; // 이 컴포넌트에서 가져올 파일 경로

// 컴포넌트가 마운트될 때 데이터를 가져옵니다.
onMounted(async () => {
  await dataStore.fetchJsonData(filepath);
  // Pinia 스토어가 데이터 갱신되면 ref에 반영
  data.value = dataStore.jsonDataMaplestory;
  isLoading.value = dataStore.pending;
  errorMessage.value = dataStore.errorMessage;
});
</script>

<template>
  <div>
    <!-- 로딩 중 -->
    <div v-if="isLoading">Loading...</div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="error">
      Error: {{ errorMessage }}
    </div>

    <!-- 데이터 표시 -->
    <div v-else>
      <VRow>
        <VCol cols="12">
          <VCard title="Maplestory">
            <VTable>
              <thead>
                <tr>
                  <th class="text-uppercase text-subtitle-1">
                    소식
                  </th>
                  <th class="text-uppercase text-subtitle-1">
                    날짜
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- data가 배열일 경우 v-for로 반복 -->
                <tr v-for="(item, index) in data" :key="index">
                  <td>
                    {{ item.Text }}
                  </td>
                  <td>
                    {{ item.Date }}
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
