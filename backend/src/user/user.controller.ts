import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
  UnauthorizedException,
  HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,ChangePasswordDto} from './dto/create-user.dto';
import {EnvelopeService} from '../envelope/envelope.service'
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEnvelopeDto } from 'src/envelope/dto/create-envelope.dto';
import { AuthGuard } from '../auth/auth.guard'
import {hash,compare} from 'bcrypt'
import { Envelope } from '../envelope/entities/envelope.entity';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly envelopeService: EnvelopeService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {

    let depositDto:CreateEnvelopeDto = {
      category:'deposit',
      budget:0,
      spent:0,
      transactions:[]
    }
    let withdrawDto:CreateEnvelopeDto = {
      category:'withdraw',
      budget:0,
      spent:0,
      transactions:[]
    }

    let depositEnv:Envelope
    let withdrawEnv:Envelope
   
    try{
      depositEnv = await this.envelopeService.createEnvelope(depositDto)
      withdrawEnv = await this.envelopeService.createEnvelope(withdrawDto)
      createUserDto.envelopes = []
      createUserDto.envelopes.push(depositEnv)
      createUserDto.envelopes.push(withdrawEnv)
      await this.userService.createUser(createUserDto);
    }

    catch (error){

      try{
        await this.envelopeService.removeEnvelope(depositEnv)
        await this.envelopeService.removeEnvelope(withdrawEnv)
      }

      catch (error) {console.log(error) }

      if(error.detail && error.detail.includes('Key (user_name)=')){
        throw new HttpException(
          'Email already exists. Please pick a different email.',
          HttpStatus.CONFLICT
        )
      }
      console.log(error)
      return;
    }
    
    return {'user_name': createUserDto['user_name']}
  }

  @UseGuards(AuthGuard)
  @Get('account')
  getAccount(@Request() req) {
    return this.userService.viewUser(req.user.userId)
    .then((result)=>{result['access_token']=req['access_token'];return result})
  }

  @UseGuards(AuthGuard)
  @Get('envelopeinfo')
  getEnvelopes(@Request() req) {
    return this.userService.viewUserEnvelopes(req.user.userId)
    .then((result)=>{return {envelopes:result,access_token:req['access_token']}})
  }

  @UseGuards(AuthGuard)
  @Get('transactioninfo')
  getTransactions(@Request() req) {
    return this.userService.viewUserTransactions(req.user.userId)
    .then((result)=>{return {transactions:result,access_token:req['access_token']}})
  }

  @UseGuards(AuthGuard)
  @Post('password')
  async changePassword(@Request() req,
  @Body() changePasswordDto:ChangePasswordDto) {
    const userId = req.user.userId
    const password = changePasswordDto.password
    const newPassword = changePasswordDto.newPassword
    let user = await this.userService.viewUser(userId)
    if (!user){
      throw new HttpException(
          'Email not found.',
          HttpStatus.NOT_FOUND
      )
  }
  const hashedPass = user.password
  const comparison = await compare(password,hashedPass)
  if (comparison===false){
    throw new UnauthorizedException('Wrong password.');
  }
  const hashedNewPass = await hash(newPassword,10);
  let updateUserDto:UpdateUserDto
  let id:number;
  ({id: id, ...updateUserDto} = user)
  updateUserDto.password = hashedNewPass
  await this.userService.updateUser(id,updateUserDto)
    return {
      message:'You have successfully changed your password.',
      access_token: req['access_token']
    }
  }

  @UseGuards(AuthGuard)
  @Get('checkLogin')
  checkLogin(@Request() req) {
    return {
      message: 'Logged in',
      access_token: req['access_token']
    }
  }

}




 

