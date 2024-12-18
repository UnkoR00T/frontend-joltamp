<script setup>
import { dataUsersList} from '../../data/users'

const UsersList = dataUsersList()

const props = defineProps({
  user: { type: Object, required: true },
});



</script>

<template>
<div class="profile">
  {{user}}
</div>
</template>

<style scoped>
.profile{
  background-color: black;
  color: white;
  border: 1px solid #ffffff55;
  border-radius: 5px;
  padding: 5px;

}

</style>