<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useJsonDataStoreGenshin } from '@/stores/dataStoreGenshin'; // Pinia 스토어 임포트

// Pinia 스토어 사용
const dataStore = useJsonDataStoreGenshin();
const data = ref(dataStore.jsonData);
const isLoading = ref(dataStore.pending);
const errorMessage = ref(dataStore.errorMessage);

// 각각 다른 filepath 설정
const filepath = 'Genshin.json'; // 이 컴포넌트에서 가져올 파일 경로

// 컴포넌트가 마운트될 때 데이터를 가져옵니다.
onMounted(async () => {
  await dataStore.fetchJsonData(filepath);
  // Pinia 스토어가 데이터 갱신되면 ref에 반영
  data.value = dataStore.jsonDataGenshin;
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
          <VCard title="Genshin Impact">
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
