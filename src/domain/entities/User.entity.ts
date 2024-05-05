import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile.entity";
import { Email, Password, Username } from "@shared/types";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { UserRole } from "@application/user/auth/dto/create-user-dto-application";

@ApiTags("User", "Authentification")
@Index("ck_email", ["email"], { unique: true })
@Entity("User", { schema: "migration1" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  @ApiProperty({ description: "id", type: "number" })
  id: number;

  @Column("varchar", { name: "username", length: 80 })
  @ApiProperty({ description: "username", type: "Username" })
  username: Username;

  @Column("varchar", { name: "password", length: 250 })
  @ApiProperty({ description: "password", type: "Password" })
  password: Password;

  @Column("varchar", { name: "email", unique: true, length: 80 })
  @ApiProperty({ description: "email", type: "Email" })
  email: Email;

  @Column("enum", {
    name: "role",
    enum: UserRole,
    default: UserRole.User,
  })
  @ApiProperty({
    description: "role",
    type: '"ADMIN" | "USER" | "CONTRIBUTEUR"',
  })
  role: UserRole;

  @OneToOne(() => Profile, (profile) => profile)
  @JoinColumn()
  @ApiProperty({ description: "profile", type: "Profile" })
  profile: Profile;
}
