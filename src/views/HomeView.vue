<template>
  <main>
    <transition name="slide-fade">
      <form v-show="step === 1" @submit.prevent="handleSubmit" class="step-box">
        <p class="form-title">ثبت آدرس</p>
        <div class="form-box row m-0">
          <div class="col-12">
            <p class="form-box-title mt-2">لطفا مشخصات و آدرس خود را وارد کنید</p>
          </div>
          <div class="col-12 col-md-4 my-2">
            <label for="first-name" class="form-label">نام</label>
            <input v-model="firstName" type="text" class="form-control" id="first-name"
              :class="{ 'is-invalid': !validFirstName && firstNameValidation }">
            <div class="invalid-feedback">
              نام وارد شده باید دارای 3 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 col-md-4 my-2">
            <label for="last-name" class="form-label">نام خانوادگی</label>
            <input v-model="lastName" type="text" class="form-control" id="last-name"
              :class="{ 'is-invalid': !validLastName && lastNameValidation }">
            <div class="invalid-feedback">
              نام باید دارای 3 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 col-md-4 my-2">
            <label for="mobile" class="form-label">شماره تلفن همراه</label>
            <input v-model="mobile" type="text" class="form-control" id="mobile"
              :class="{ 'is-invalid': !validMobile && mobileValidation }">
            <div class="invalid-feedback">
              نام خانوادگی باید دارای 3 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 col-md-4 my-2">
            <div class="d-flex justify-content-between align-items-center">
              <label for="phone" class="form-label">شماره تلفن ثابت <small>(اختیاری)</small></label>
              <span class="label-span">*با پیش شماره</span>
            </div>
            <input v-model="phone" type="text" class="form-control" id="phone"
              :class="{ 'is-invalid': !validPhone && phoneValidation }">
            <div class="invalid-feedback">
              شماره وارد شده صحیح نمیباشد
            </div>
          </div>
          <div class="col-12 col-md-8 my-2">
            <label for="address" class="form-label">آدرس</label>
            <input v-model="address" type="text" class="form-control" id="address"
              :class="{ 'is-invalid': !validAddress && addressValidation }">
            <div class="invalid-feedback">
              آدرس باید حداقل 10 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 my-2">
            <div class="d-flex">
              <span class="ms-5">جنسیت</span>
              <div class="form-check">
                <input v-model="gender" class="form-check-input" type="radio" name="flexRadioWoman" id="flexRadioWoman"
                  value="female">
                <label class="form-check-label" for="flexRadioWoman">
                  خانم
                </label>
              </div>
              <div class="form-check me-3">
                <input v-model="gender" class="form-check-input" type="radio" name="flexRadioMan" id="flexRadioMan"
                  value="man" checked>
                <label class="form-check-label" for="flexRadioMan">
                  آقا
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="footer bg-white px-md-5 py-md-2">
          <button type="submit" class="btn btn-submit">
            <Loading v-if="loading == true" />
            <span v-else>ثبت و ادامه</span>
          </button>
        </div>
      </form>
    </transition>
    <transition name="slide-fade">
      <div v-show="step === 2" class="step-box">
        <p class="form-title">
          <btn class="btn navigation-btn" @click="prev()"><img src="/src/assets/back.png" alt=""></btn>انتخاب آدرس
        </p>
        <div class="form-box map">
          <div>
            <p class="map-title">موقعیت مورد نظر خود را روی نقشه مشخص کنید</p>
          </div>
          <GoogleMap :api-key="googleKey" style="width: 100%; height: 22rem" :center="center" :zoom="15"
            class="google-map">
            <Marker :options="markerOptions" @dragend="map" />
          </GoogleMap>
        </div>
        <div class="footer bg-white px-md-5 py-md-2">
          <button v-show="step === 2" class="btn btn-submit" @click="RegisterUser">
            <Loading v-if="loading == true" />
            <span v-else>ثبت و ادامه</span>
          </button>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-show="step === 3" class="step-box">
        <div class="form-box">
          <h2>آدرس شما با موفقیت ثبت شد</h2>
        </div>
      </div>
    </transition>
    <div v-show="AlertError == true" class="alert alert-danger" role="alert">
      <span>{{ errorMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import Loading from '@/components/LoadingComponent.vue';


const step = ref(1);
const firstName = ref('');
const lastName = ref('');
const mobile = ref('');
const phone = ref('');
const address = ref('');
const gender = ref('male');
const AlertError = ref(false);
const errorMessage = ref('');
const userAddress = ref('');
const loading = ref(false);

const firstNameValidation = ref(false);
const lastNameValidation = ref(false);
const mobileValidation = ref(false);
const phoneValidation = ref(false);
const addressValidation = ref(false);

const validFirstName = ref(true);
const validLastName = ref(true);
const validMobile = ref(true);
const validPhone = ref(true);
const validAddress = ref(true);


const center = { lat: 35.7219, lng: 51.3347 };
const userLocation = ref({});
const googleKey = ref('AIzaSyAw-ekBaMquh5_hGvzVvbqyJ_voBQjI518');
const markerOptions = { position: center, title: 'YOUR LOCATION', draggable: true };


const prev = () => {
  step.value--
}

const next = () => {
  step.value++
}

const map = (e) => {
  userLocation.value.lat = e.latLng.lat()
  userLocation.value.lng = e.latLng.lng()
}

const RegisterUser = () => {
  let payload = {
    first_name: firstName.value,
    last_name: lastName.value,
    coordinate_mobile: mobile.value,
    coordinate_phone_number: phone.value,
    address: address.value,
    region: `1`,
    lat: userLocation.value.lat,
    lng: userLocation.value.lng,
    gender: gender.value,
  };
  const config = {
    method: 'post',
    url: 'https://stage.achareh.ir/api/karfarmas/address',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
    },
    data: payload
  };
  loading.value = true;
  axios(config).then((response) => {
    userAddress.value = response.data
    loading.value = false;
    next()
  })
    .catch(httpErrorHandler)
}

const errorAlert = (message) => {
  AlertError.value = true;
  errorMessage.value = message
}


const httpErrorHandler = (error) => {
  if (error === null) throw new Error('Unrecoverable error!! Error is null!');
  if (axios.isAxiosError(error)) {
    const response = error.response
    const request = error.request

    if (error.code === 'ERR_NETWORK') {
      errorAlert(error.message)
      loading.value = false;
    } else if (error.code === 'ERR_CANCELED') {
      errorAlert(error.message)
      loading.value = false;
    }
    if (response) {
      const statusCode = response?.status
      if (statusCode === 404) {
        errorAlert(response.data.detail)
        loading.value = false;
      } else if (statusCode === 401) {
        errorAlert(response.data.detail)
        loading.value = false;
      }
    } else if (request) {
      errorAlert(response.data.detail)
      loading.value = false;
    }
  }
  errorAlert(error.message)
  loading.value = false;
}

const handleSubmit = () => {
  firstNameValidation.value = true;
  validFirstName.value = firstName.value.length >= 3;
  lastNameValidation.value = true;
  validLastName.value = lastName.value.length >= 3;
  addressValidation.value = true;
  validAddress.value = address.value.length >= 10;
  phoneValidation.value = true;
  validPhone.value = /^[0-9]{11}$/.test(phone.value);
  mobileValidation.value = true;
  validMobile.value = /^[0-9]{11}$/.test(mobile.value);
  if (validFirstName.value && validLastName.value && validMobile.value && validAddress.value) {
    next()
  } else {
    errorAlert('لطفا همه فیلد هارو به درستی پر کنید')
    setTimeout(() => {
      AlertError.value = false;
    }, 5000);
  }
}

watch(firstName, (newVal) => {
  firstNameValidation.value = true;
  validFirstName.value = newVal.length >= 3;
})

watch(lastName, (newVal) => {
  lastNameValidation.value = true;
  validLastName.value = newVal.length >= 3;
})

watch(mobile, (newVal) => {
  mobileValidation.value = true;
  validMobile.value = /^[0-9]{11}$/.test(newVal);
})

watch(phone, (newVal) => {
  phoneValidation.value = true;
  validPhone.value = /^[0-9]{11}$/.test(newVal);
})

watch(address, (newVal) => {
  addressValidation.value = true;
  validAddress.value = newVal.length >= 10;
})





</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box-title {
  font-size: 12px;
  font-weight: 700;
}

.step-box {
  margin: 1rem;
  width: 100%;
}

.form-box {
  padding: 1rem 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.1);
  padding-bottom: 7rem;
}

.form-box.map {
  padding: 0 !important;
}

.form-box .google-map {
  height: 22rem;
}

.form-title {
  color: rgba(55, 71, 79, 1);
  font-size: 16px;
  font-weight: 500;
}

.form-control:focus {
  box-shadow: none;
  border-color: rgba(0, 191, 165, 1);
}

.form-check-input:checked[type=radio] {
  background-image: url('/src/assets/check.svg') !important;
  border-color: rgba(0, 191, 165, 1);
}

.form-check-input:focus {
  box-shadow: none;
}

.form-control.is-invalid,
.was-validated .form-control:invalid {
  background-position: left calc(.375em + .1875rem) center;
  padding-right: 12px !important;
  border-color: red !important;
}

.form-control.is-invalid:focus,
.was-validated .form-control:invalid:focus {
  box-shadow: none !important;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.1);
}

.alert {
  position: absolute;
  bottom: 10px;
  right: 20px;
  left: 20px;
}

.form-label {
  font-size: 12px;
  font-weight: 500;
}

.label-span {
  color: rgba(117, 117, 117, 1);
  font-size: 10px;
  margin-bottom: 8px;
}

.btn-submit {
  border: 0;
  color: #fff;
  background-color: rgba(0, 191, 165, 1);
  font-size: 16px;
  font-weight: 700;
  margin: 0.7rem 0;
  padding: 0.7rem 5rem;
  width: 100%;
  margin: 0.8rem;
}

.navigation-btn {
  border: 0 !important;
  padding-right: 0;
}

.map-title {
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-right: 2rem;
  margin-bottom: 0;
  font-size: 12px;
  color: rgba(55, 71, 79, 1);
  font-weight: 600;
}

@media(min-width:768px) {
  .step-box {
    width: auto;
  }

  .form-box {
    padding: 1rem 2rem;
    max-width: 50rem;
    height: 23rem;
    min-width: 50rem;
  }

  .alert {
    width: auto;
    max-width: 25rem;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .form-label {
    font-size: 14px;
    font-weight: 500;
  }

  .btn-submit {
    width: auto;
    margin: 0.8rem;
  }

  .form-box .google-map {
    height: 100% !important;
  }

}
</style>
