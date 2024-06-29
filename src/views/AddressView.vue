<template>
    <main>
        <div v-if="loading == false" class="Address-box">
            <h1>آدرس ها و مشخصات</h1>
            <div v-for="(item, i) in AddressData" :key="i" class="info-box p-3 p-md-4">
                <div class="d-flex flex-column align-items-start">
                    <div
                        class="info-item w-100 d-flex flex-row justify-content-between flex-md-column align-items-md-start">
                        <span class="title">نام</span>
                        <span class="value">{{ item.first_name }}</span>
                    </div>
                    <div
                        class="info-item w-100 d-flex flex-row justify-content-between flex-md-column align-items-md-start">
                        <span class="title">نام خانوادگی</span>
                        <span class="value">{{ item.last_name }}</span>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-start">
                    <div
                        class="info-item w-100 d-flex flex-row justify-content-between flex-md-column align-items-md-start">
                        <span class="title">شماره همراه</span>
                        <span class="value">{{ item.coordinate_mobile }}</span>
                    </div>
                    <div
                        class="info-item w-100 d-flex flex-row justify-content-between flex-md-column align-items-md-start">
                        <span class="title">تلفن ثابت</span>
                        <span class="value">{{ item.coordinate_phone_number }}</span>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-start">
                    <div
                        class="info-item w-100 d-flex flex-row justify-content-between flex-md-column align-items-md-start">
                        <span class="title">جنسیت</span>
                        <span class="value">{{ item.gender }}</span>
                    </div>
                    <div
                        class="info-item address w-100 d-flex flex-row justify-content-between flex-md-column align-items-md-start">
                        <span class="title">آدرس</span>
                        <span class="value">{{ item.address }}</span>
                    </div>
                </div>
            </div>
        </div>
        <Loading class="loading" v-else />
        <div v-show="AlertError == true" class="alert alert-danger" role="alert">
            <span>{{ errorMessage }}</span>
        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Loading from '@/components/LoadingComponent.vue';

const AddressData = ref('')
const AlertError = ref(false);
const errorMessage = ref('');
const loading = ref(false);


const getAddress = () => {
    const config = {
        method: 'get',
        url: 'https://stage.achareh.ir/api/karfarmas/address',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
        }
    };
    loading.value = true;
    axios(config).then((response) => {
        AddressData.value = response.data;
        loading.value = false;
    })
        .catch(httpErrorHandler)
}

const httpErrorHandler = (error) => {
    if (error === null) throw new Error('Unrecoverable error!! Error is null!');
    if (axios.isAxiosError(error)) {
        const response = error.response
        const request = error.request

        if (error.code === 'ERR_NETWORK') {
            errorAlert(error.message);
            loading.value = false;
        } else if (error.code === 'ERR_CANCELED') {
            errorAlert(error.message);
            loading.value = false;
        }
        if (response) {
            const statusCode = response?.status
            if (statusCode === 404) {
                errorAlert(response.data.detail);
                loading.value = false;
            } else if (statusCode === 401) {
                errorAlert(response.data.detail);
                loading.value = false;
            }
        } else if (request) {
            errorAlert(response.data.detail);
            loading.value = false;
        }
    }
    errorAlert(error.message)
    loading.value = false;
}

const errorAlert = (message) => {
    AlertError.value = true;
    errorMessage.value = message
}


onMounted(() => {
    getAddress()
})
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.alert {
    min-width: 10rem;
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 100%;
}

.Address-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem;
    border-radius: 4px;
}

.Address-box h1 {
    font-size: 16px;
    font-weight: 500;
    color: rgba(55, 71, 79, 1);
    padding: 0.7rem 0;
}

.info-box {
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.info-item {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.info-item.address {
    padding-top: 0.7rem;
    border-top: 1px solid rgba(224, 224, 224, 1);
}

.info-item .title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    padding: 0.2rem 0;
}

.info-item .value {
    font-size: 16px;
    font-weight: 600;
    color: rgba(55, 71, 79, 1);
    padding: 0.2rem 0;
}

.loading {
    margin-top: 5rem;
}

@media(min-width:768px) {
    .alert {
        width: auto;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

    .info-box {
        min-width: 50rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .Address-box {
        max-width: 50rem;
    }

    .info-item.address {
        border-top: 0;
    }
}
</style>