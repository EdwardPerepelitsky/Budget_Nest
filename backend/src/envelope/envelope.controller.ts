import { Controller, Get, Post, Body, Patch, Param,
   Delete,Request,HttpException,HttpStatus,UseGuards } from '@nestjs/common';
import { EnvelopeService } from './envelope.service';
import { CreateEnvelopeDto, RemoveEnvelopeDto } from './dto/create-envelope.dto';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';
import { UserService } from '../user/user.service';
import { Envelope } from './entities/envelope.entity';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('users')
export class EnvelopeController {
  constructor(private readonly envelopeService: EnvelopeService,
    private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('addenvelope')
  async create(@Body() createEnvelopeDto: CreateEnvelopeDto,
  @Request() req){

    const budget = Number(createEnvelopeDto.budget)
    const userId = req.user.userId
    let user = await this.userService.viewUser(userId)
    let availableBalance = Number(user.available_balance)
    if(budget>availableBalance){
      throw new HttpException(
        "You can't allocate more money than your available balance.",
         HttpStatus.CONFLICT
      )
    }

    availableBalance = availableBalance - budget
    let Env:Envelope
    let envId:number

    try{
      Env = await this.envelopeService.createEnvelope(createEnvelopeDto)
      .then((result)=>{envId=result.id;return result})
      let updateUserDto:UpdateUserDto
      let id:number;
      ({id: id, ...updateUserDto} = user)
      updateUserDto.available_balance = availableBalance
      await this.userService.viewUserEnvelopes(userId)
      .then((result)=>updateUserDto.envelopes=result)
      updateUserDto.envelopes.push(Env)
      await this.userService.updateUser(id,updateUserDto);
    }

    catch (error){

      try{
        await this.envelopeService.removeEnvelope(Env)
      }
      catch (error) {console.log(error) }
      console.log(error)
      return;
    }

    return {
      available_balance: availableBalance,
      envId : envId,
      access_token: req['access_token']
    }
  }

  @UseGuards(AuthGuard)
  @Post('removeenvelope')
  async remove(@Body() removeEnvelopeDto: RemoveEnvelopeDto,
  @Request() req){

    const userId = req.user.userId
    const eId = Number(removeEnvelopeDto.eId);
    const budget = Number(removeEnvelopeDto.budget);
    const spent = Number(removeEnvelopeDto.spent);

    let user = await this.userService.viewUser(userId)

    let availableBalance = Number(user.available_balance)
    let balance = Number(user.balance)

    availableBalance = availableBalance + budget + spent
    balance = balance + spent

    let updateUserDto:UpdateUserDto
    let id:number;
    ({id: id, ...updateUserDto} = user)
    updateUserDto.available_balance = availableBalance
    updateUserDto.balance = balance

    try{
      await this.envelopeService.removeEnvelopeId(eId)
      await this.userService.updateUser(userId,updateUserDto)
    }

    catch(error){
      console.log(error)
    }

    return {
      available_balance: availableBalance,
      balance: balance,
      access_token: req['access_token']
    }

  }

  @UseGuards(AuthGuard)
  @Post('updateenvelope')
  async update(@Body() updateEnvelopeDto: UpdateEnvelopeDto,
  @Request() req){
    const userId = req.user.userId
    const eId = Number(updateEnvelopeDto.eId)
    const deltaBudget = Number(updateEnvelopeDto.deltaBudget)
    let envBudget = Number(updateEnvelopeDto.budget)
    const envSpent = Number(updateEnvelopeDto.spent)

    let user = await this.userService.viewUser(userId)

    let availableBalance = Number(user.available_balance);

    if (deltaBudget > availableBalance){
      throw new HttpException(
        "You can't allocate more money than your available balance.",
         HttpStatus.CONFLICT
      )
  }

    if (deltaBudget < - envBudget){
        throw new HttpException(
        "You can't lower envelope budget below 0.",
        HttpStatus.CONFLICT
      )
    }

    envBudget = envBudget + deltaBudget
    availableBalance = availableBalance - deltaBudget

    let updateUserDto:UpdateUserDto
    let id:number;
    ({id: id, ...updateUserDto} = user)
    updateUserDto.available_balance = availableBalance
    updateEnvelopeDto.budget = envBudget

    try{
      await this.envelopeService.updateEnvelope(eId,updateEnvelopeDto)
      await this.userService.updateUser(userId,updateUserDto)
    }

    catch(error){
      console.log(error)
    }

    return {
      available_balance: availableBalance,
      envBudget: envBudget,
      envSpent: envSpent,
      access_token: req['access_token']
    }

  }
}




  