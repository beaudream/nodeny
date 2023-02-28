import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { Room, User } from "../../../shared/interfaces/chat.interface";

@Injectable()
export class UserSevice {
  constructor(private prisma: PrismaService) {}

  private rooms: Room[] = [];

  async list() {
    return await this.prisma.user.findMany();
  }

  async get(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(dto: CreateUserDTO) {
    const hash = await argon.hash(dto.password);
    try {
      return await this.prisma.user.create({
        data: {
          ...dto,
          password: hash,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == "P2002") {
          const duplicatedField: string = e.meta.target[0];
          throw new BadRequestException(
            `A user with this ${duplicatedField} already exists`
          );
        }
      }
    }
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      const hash = user.password && (await argon.hash(user.password));

      return await this.prisma.user.update({
        where: { id },
        data: { ...user, password: hash },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == "P2002") {
          const duplicatedField: string = e.meta.target[0];
          throw new BadRequestException(
            `A user with this ${duplicatedField} already exists`
          );
        }
      }
    }
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async addRoom(roomName: string, host: User): Promise<void> {
    const room = await this.getRoomByName(roomName)
    if (room === -1) {
      await this.rooms.push({ name: roomName, host, users: [host] })
    }
  }

  async removeRoom(roomName: string): Promise<void> {
    const findRoom = await this.getRoomByName(roomName)
    if (findRoom !== -1) {
      this.rooms = this.rooms.filter((room) => room.name !== roomName)
    }
  }

  async getRoomHost(hostName: string): Promise<User> {
    const roomIndex = await this.getRoomByName(hostName)
    return this.rooms[roomIndex].host
  }

  async getRoomByName(roomName: string): Promise<number> {
    const roomIndex = this.rooms.findIndex((room) => room?.name === roomName)
    return roomIndex
  }

  async addUserToRoom(roomName: string, user: User): Promise<void> {
    const roomIndex = await this.getRoomByName(roomName)
    if (roomIndex !== -1) {
      this.rooms[roomIndex].users.push(user)
      const host = await this.getRoomHost(roomName)
      if (host.userId === user.userId) {
        this.rooms[roomIndex].host.socketId = user.socketId
      }
    } else {
      await this.addRoom(roomName, user)
    }
  }

  async findRoomsByUserSocketId(socketId: string): Promise<Room[]> {
    const filteredRooms = this.rooms.filter((room) => {
      const found = room.users.find((user) => user.socketId === socketId)
      if (found) {
        return found
      }
    })
    return filteredRooms
  }

  async removeUserFromAllRooms(socketId: string): Promise<void> {
    const rooms = await this.findRoomsByUserSocketId(socketId)
    for (const room of rooms) {
      await this.removeUserFromRoom(socketId, room.name)
    }
  }

  async removeUserFromRoom(socketId: string, roomName: string): Promise<void> {
    const room = await this.getRoomByName(roomName)
    this.rooms[room].users = this.rooms[room].users.filter((user) => user.socketId !== socketId)
    if (this.rooms[room].users.length === 0) {
      await this.removeRoom(roomName)
    }
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms
  }
}
