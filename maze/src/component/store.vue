<template>
	<div>
	<div class="store" @click='goStore'>商店</div>
	 <el-dialog
	  title="商店"
	  :visible.sync="storeVisible"
	  width="40%"
	  :before-close="handleStoreClose">
	  <el-form ref="form" :model="form" label-width="150px">
	  	<el-form-item label="现在拥有金币：">
		 	<label>{{money}}</label>
		</el-form-item>
		<div v-for='item in storeItems' class="storeItem">
			<label class="itemLabel">{{item.forChn}}{{item.value}}：{{item.cost}}金币</label>
			<el-button type="primary"  @click='buySome(item)'>购买</el-button>
		</div>
		<!-- <el-form-item label="{{item.name}}{{item.value}}：{{item.cost}}金币" v-for='item in storeItems'>
		  <el-button type="primary"  @click='buySome(item)'>购买</el-button>
		</el-form-item> -->
		    <!-- <el-form-item label="攻击5：1000金币">
		  <el-button type="primary" @click='buySome(form.attack)'>购买</el-button>
		  </el-form-item>
		  <el-form-item label="防御5：1000金币">
		  <el-button type="primary" @click='buySome(form.defense)'>购买</el-button>
		  </el-form-item> -->
		</el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="storeVisible = false">取 消</el-button>
	    <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
	  </span>
	</el-dialog>
	</div>
	 
</template>
<script type="text/javascript">
	export default{
		props:{money:''},
		data(){
			return{
				storeVisible:false,
				form:{
					blood:{
						type:1,
						value:50,
						cost:1000,
					},
					attack:{
						type:2,
						value:5,
						cost:1000,
					},
					defense:{
						type:3,
						value:5,
						cost:1000,
					},
				},
				storeItems:[
					{
						name:'blood',
						forChn:'血量',
						kind:1,
						value:50,
						cost:1000,
					},
					{
						name:'attack',
						forChn:'攻击',
						kind:2,
						value:5,
						cost:1000,
					},
					{
						name:'defense',
						forChn:'防御',
						kind:3,
						value:5,
						cost:1000,
					},
					{
						name:'军用头盔',
						type:'helmet',

					}
				]
				// money:0,
			}
		},
		methods:{
			goStore(){
				console.log('store click')
				this.storeVisible = true;
			},
			handleStoreClose(){
				this.storeVisible = false;
			},
			buySome(val){
				console.log('something',JSON.stringify(val));
				
				if(this.money>=val.cost){
					this.$emit('buySome',val)	
				}else{
					this.$message({
						type:'error',
						message:'钱不够了造么，打怪能赚钱哦！'
					})
				}
				
			}
		},
		beforeMount(){
			console.log()
		}
	}
</script>
<style type="text/css">
	
</style>