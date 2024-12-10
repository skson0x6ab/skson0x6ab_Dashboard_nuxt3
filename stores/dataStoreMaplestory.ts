import { defineStore } from 'pinia';

export const useJsonDataStoreMaplestory = defineStore('jsonDataMaplestory', {
  state: () => ({
    jsonData: null, // GitHub에서 받아올 데이터
    pending: false, // 데이터 로딩 상태
    errorMessage: null, // 에러 메시지
  }),
  actions: {
    async fetchJsonData(filepath: string) {
      if (this.jsonDataMaplestory) return; // 이미 데이터가 있으면 새로 가져오지 않음

      this.pending = true;
      this.pending = null;
      try {
        // Nuxt의 $fetch로 API 호출
        const data = await $fetch(`/api/githubData/${filepath}`);
        this.jsonDataMaplestory = data;
      } catch (error) {
        this.errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';
        console.error('Error loading data:', error);
      } finally {
        this.pending = false;
      }
    },
  },
});
