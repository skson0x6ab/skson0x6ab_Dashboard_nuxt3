<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useJsonDataStoreFF14 } from '@/stores/dataStoreFF14';

const dataStore = useJsonDataStoreFF14();
const data = ref(dataStore.jsonData);
const isLoading = ref(dataStore.pending);
const errorMessage = ref(dataStore.errorMessage);

// 각 컴포넌트에서 고정된 filepath 설정
const filepath = 'FF14.json';

onMounted(async () => {
  await dataStore.fetchJsonData(filepath);
  data.value = dataStore.jsonDataFF14;
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
          <VCard title="FinalFantasy IX">
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
